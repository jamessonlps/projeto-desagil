package br.edu.insper.desagil.backend.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.db.DocumentoDAO;
import br.edu.insper.desagil.backend.db.ObraDAO;
import br.edu.insper.desagil.backend.db.ObservacaoDAO;
import br.edu.insper.desagil.backend.db.PavimentoDAO;
import br.edu.insper.desagil.backend.db.SetorDAO;
import br.edu.insper.desagil.backend.db.TagDAO;
import br.edu.insper.desagil.backend.model.Documento;
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Observacao;
import br.edu.insper.desagil.backend.model.Pavimento;
import br.edu.insper.desagil.backend.model.Setor;
import br.edu.insper.desagil.backend.model.Tag;


class CasosDeUso {
	private DocumentoEndpoint documentoEndpoint;
	private ObraEndpoint obraEndpoint;
	private PavimentoEndpoint pavimentoEndpoint;
	private SetorEndpoint setorEndpoint;
	private TagEndpoint tagEndpoint;
	private Map<String, String> infoObra;
	private Map<String, String> infoPavimento;
	private Map<String, String> infoSetorA;
	private Map<String, String> infoTagPavimento;
	private Map<String, String> infoTagSetor;
	private Map<String, String> infoTagDocumento;
	private DocumentoDAO documentoDAO;
	private ObraDAO obraDAO;
	private PavimentoDAO pavimentoDAO;
	private SetorDAO setorDAO;
	private ObservacaoDAO observacaoDAO;
	private TagDAO tagDAO;
	
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	
	@BeforeEach 
	public void setUp() throws APIException, DBException{
		documentoDAO = new DocumentoDAO();
		obraDAO = new ObraDAO();
		pavimentoDAO = new PavimentoDAO();
		setorDAO = new SetorDAO();
		observacaoDAO = new ObservacaoDAO();
		tagDAO = new TagDAO();
		
		documentoDAO.deleteAll();
		obraDAO.deleteAll();
		pavimentoDAO.deleteAll();
		setorDAO.deleteAll();
		observacaoDAO.deleteAll();
		tagDAO.deleteAll();
		
		obraEndpoint = new ObraEndpoint();
		infoObra = obraEndpoint.post(null, new Obra("Campos Elíseos - Torre A", "Rua do Paraíso", "Zeus"));
		
		documentoEndpoint = new DocumentoEndpoint();
		Documento documentoA = new Documento (infoObra.get("key"), "Planta Escritório", "planta baixa", "https://firebasestorage.googleapis.com/v0/b/jalhervan-teste.appspot.com/o/Casos%20de%20Uso%2Fplanta%20-%20apartamento.pdf?alt=media&token=47a85a08-6f41-48a3-b658-950f6e99dc5c" );
		Documento documentoB = new Documento (infoObra.get("key"), "Planta Pavimento 12", "planta baixa", "https://firebasestorage.googleapis.com/v0/b/jalhervan-teste.appspot.com/o/Casos%20de%20Uso%2Fplantas%20-%20pavimentos%20-%20detalhada.pdf?alt=media&token=2c7290a1-2e06-43fa-b312-0ab74405b6bd" );

		
		Map<String, String> infoDocA = documentoEndpoint.post(null, documentoA);
		Map<String, String> infoDocB = documentoEndpoint.post(null, documentoB);
		
		List<String> documentosSetor =new ArrayList<>();
		documentosSetor.add(infoDocA.get("key"));
		
		List<String> documentosPavimento = new ArrayList<>();
		documentosPavimento.add(infoDocB.get("key"));
		
		setorEndpoint = new SetorEndpoint();		
		infoSetorA = setorEndpoint.post(null, new Setor(infoObra.get("key"), "Escritório XP", "Zeca Baleiro", documentosSetor));
		
		List<String> setores = new ArrayList<>();
		setores.add(infoSetorA.get("key"));
		
		pavimentoEndpoint = new PavimentoEndpoint();
		infoPavimento = pavimentoEndpoint.post(null, new Pavimento (infoObra.get("key"), "Pavimento 12", "Bob O Construtor", documentosPavimento, setores));
		
		tagEndpoint = new TagEndpoint();
		infoTagPavimento = tagEndpoint.post(null, new Tag(infoPavimento.get("key"), infoObra.get("key"), "pavimento"));
		infoTagSetor= tagEndpoint.post(null, new Tag(infoSetorA.get("key"), infoObra.get("key"), "setor"));
		infoTagDocumento= tagEndpoint.post(null, new Tag(infoDocA.get("key"), infoObra.get("key"), "documento"));
		
	}

	@Test
	public void checaPosts() throws APIException {
		assertTrue(infoObra.containsKey("key"));
		assertTrue(infoSetorA.containsKey("key"));
		assertTrue(infoPavimento.containsKey("key"));
		assertTrue(infoTagPavimento.containsKey("key"));
		assertTrue(infoTagSetor.containsKey("key"));
		assertTrue(infoTagDocumento.containsKey("key"));
		
		Setor setorGet = setorEndpoint.get(infoSetorA);
		assertEquals(1, setorGet.getDocumentos().size());
		
		Pavimento pavimentoGet = pavimentoEndpoint.get(infoPavimento);
		assertEquals(1, pavimentoGet.getDocumentos().size());
		assertEquals(1, pavimentoGet.getSetores().size());
	}

	
	@Test
	public void acessaDocumentoDiretamente() throws APIException  {
		Tag tagGet = tagEndpoint.get(infoTagDocumento);
		assertEquals("documento",tagGet.getTipo());
		
		Map<String, String> args = new HashMap<>();
		args.put("key", tagGet.getAlvo());
		
		Documento documentoGet = documentoEndpoint.get(args);
		assertEquals("Planta Escritório", documentoGet.getTitulo());
	
	}
	
	@Test
	public void acessaDocumentoPorSetor() throws APIException  {
		Tag tagGet = tagEndpoint.get(infoTagSetor);
		assertEquals("setor",tagGet.getTipo());
		
		Map<String, String> argsSetor = new HashMap<>();
		argsSetor.put("key", tagGet.getAlvo());
		
		Setor setorGet = setorEndpoint.get(argsSetor);
		assertEquals("Escritório XP", setorGet.getTitulo());
		
		Map<String, String> argsDocumento = new HashMap<>();
		argsDocumento.put("key", setorGet.getDocumentos().get(0));
		
		Documento documentoGet = documentoEndpoint.get(argsDocumento);
		assertEquals("Planta Escritório", documentoGet.getTitulo());
	}
	
	@Test
	public void acessaDocumentoPorPavimento() throws APIException  {
		Tag tagGet = tagEndpoint.get(infoTagPavimento);
		assertEquals("pavimento",tagGet.getTipo());
		
		Map<String, String> argsPavimento= new HashMap<>();
		argsPavimento.put("key", tagGet.getAlvo());
		
		Pavimento pavimentoGet = pavimentoEndpoint.get(argsPavimento);
		assertEquals("Pavimento 12", pavimentoGet.getTitulo());
		
		Map<String, String> argsDocumento = new HashMap<>();
		argsDocumento.put("key", pavimentoGet.getDocumentos().get(0));
		
		Documento documentoGet = documentoEndpoint.get(argsDocumento);
		assertEquals("Planta Pavimento 12", documentoGet.getTitulo());
	}
	
	@Test
	public void acessaSetorPorPavimento() throws APIException  {
		Tag tagGet = tagEndpoint.get(infoTagPavimento);
		assertEquals("pavimento",tagGet.getTipo());
		
		Map<String, String> argsPavimento= new HashMap<>();
		argsPavimento.put("key", tagGet.getAlvo());
		
		Pavimento pavimentoGet = pavimentoEndpoint.get(argsPavimento);
		assertEquals("Pavimento 12", pavimentoGet.getTitulo());
		
		Map<String, String> argsSetor= new HashMap<>();
		argsSetor.put("key", pavimentoGet.getSetores().get(0));
		
		Setor setorGet = setorEndpoint.get(argsSetor);
		assertEquals("Escritório XP", setorGet.getTitulo());
	}
	
	@Test
	public void adicionaObservacaoEmPavimento() throws APIException  {
		Tag tagGet = tagEndpoint.get(infoTagPavimento);
		assertEquals("pavimento",tagGet.getTipo());
		
		Map<String, String> argsPavimento= new HashMap<>();
		argsPavimento.put("key", tagGet.getAlvo());
		
		Pavimento pavimentoGet = pavimentoEndpoint.get(argsPavimento);
		assertEquals("Pavimento 12", pavimentoGet.getTitulo());
		assertEquals(0, pavimentoGet.getObservacoes().size());
		
		Obra obraGet = obraEndpoint.get(infoObra);
		assertEquals(0, obraGet.getLogs().size());
		
		ObservacaoEndpoint observacaoEndpoint = new ObservacaoEndpoint();
		Map<String, String> argsObs = new HashMap<>();
		argsObs.put("pavimento", pavimentoGet.getKey());
		Map<String, String> infoObs = observacaoEndpoint.post(argsObs, new Observacao("Piso desnivelado", "Jorge Amado", "Engenheiro Chefe", false));
		assertEquals("true", infoObs.get("addKeyResult"));
		assertEquals("true", infoObs.get("logResult"));
		
		Pavimento pavimentoFinalGet = pavimentoEndpoint.get(argsPavimento);
		assertEquals(1, pavimentoFinalGet.getObservacoes().size());
		assertEquals(infoObs.get("key"), pavimentoFinalGet.getObservacoes().get(0));
		
		Obra obraFinalGet = obraEndpoint.get(infoObra);
		assertEquals(1, obraFinalGet.getLogs().size());
		
	}
	
	@Test
	public void adicionaAlertaEmSetor() throws APIException  {
		Tag tagGet = tagEndpoint.get(infoTagSetor);
		assertEquals("setor",tagGet.getTipo());
		
		Map<String, String> argsSetor= new HashMap<>();
		argsSetor.put("key", tagGet.getAlvo());
		
		Setor setorGet = setorEndpoint.get(argsSetor);
		assertEquals("Escritório XP", setorGet.getTitulo());
		assertEquals(0, setorGet.getObservacoes().size());
		
		Obra obraGet = obraEndpoint.get(infoObra);
		assertEquals(0, obraGet.getLogs().size());
		
		ObservacaoEndpoint observacaoEndpoint = new ObservacaoEndpoint();
		Map<String, String> argsObs = new HashMap<>();
		argsObs.put("setor", setorGet.getKey());
		Map<String, String> infoObs = observacaoEndpoint.post(argsObs, new Observacao("Piso extremamente desnivelado", "Jorge Amado", "Engenheiro Chefe", true));
		assertEquals("true", infoObs.get("addKeyResult"));
		assertEquals("true", infoObs.get("logResult"));
		
		Setor setorFinalGet = setorEndpoint.get(argsSetor);
		assertEquals(1, setorFinalGet.getObservacoes().size());
		assertEquals(infoObs.get("key"), setorFinalGet.getObservacoes().get(0));
		
		Obra obraFinalGet = obraEndpoint.get(infoObra);
		assertEquals(1, obraFinalGet.getLogs().size());
	}
	 
}
