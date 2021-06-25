package br.edu.insper.desagil.backend.api;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.db.ObraDAO;
import br.edu.insper.desagil.backend.db.ObservacaoDAO;
import br.edu.insper.desagil.backend.db.SetorDAO;
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Observacao;
import br.edu.insper.desagil.backend.model.Setor;

class ObservacaoEndpointTest {
	private Map<String, String> newObservacaoPost;
	private ObservacaoEndpoint observacaoEndpoint;
	private ObservacaoDAO observacaoDAO;
	
	private Map<String, String> newSetorPost;
	private SetorEndpoint setorEndpoint;
	private SetorDAO setorDAO;
	
	private ObraEndpoint obraEndpoint;
	private ObraDAO obraDAO;
	
	private Map<String, String> argsObs;

	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		obraDAO = new ObraDAO();
		obraDAO.deleteAll();
		obraEndpoint = new ObraEndpoint();
		Map<String, String> newObraPost = obraEndpoint.post(null,  new Obra("FL Square", "Faria Lima 1082", "Oscar Niemeyer"));
		
		setorDAO = new SetorDAO();
		setorDAO.deleteAll();
		setorEndpoint = new SetorEndpoint();
		newSetorPost = setorEndpoint.post(null,  new Setor(newObraPost.get("key"), "Escritório XP Investimentos", "José Garcia"));
		
		argsObs = new HashMap<>();
		argsObs.put("setor", newSetorPost.get("key"));
		
		observacaoDAO = new ObservacaoDAO();
		observacaoDAO.deleteAll();
		observacaoEndpoint = new ObservacaoEndpoint();
		newObservacaoPost = observacaoEndpoint.post(argsObs,  new Observacao("Problema estrutural", "Clara Borges", "Encanadora", true));
	}
	
	@Test
	public void postAndGet() throws APIException {
		assertTrue(newObservacaoPost.containsKey("date"));
		assertEquals("true", newObservacaoPost.get("addKeyResult"));
		
		Observacao observacaoGet = observacaoEndpoint.get(newObservacaoPost);
		assertEquals(newObservacaoPost.get("key"), observacaoGet.getKey());			
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(newObservacaoPost.containsKey("date"));
		assertEquals("true", newObservacaoPost.get("addKeyResult"));
		
		Observacao observacaoGet = observacaoEndpoint.get(newObservacaoPost);
		observacaoGet.setAssunto("Cano furado");
		
		Map<String, String> resultPut = observacaoEndpoint.put(newObservacaoPost, observacaoGet);
		assertTrue(resultPut.containsKey("date"));
		
		Observacao modifiedObservacaoGet = observacaoEndpoint.get(newObservacaoPost);
		assertEquals(newObservacaoPost.get("key"), modifiedObservacaoGet.getKey());
		assertEquals("Cano furado", modifiedObservacaoGet.getAssunto());
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		assertTrue(newObservacaoPost.containsKey("date"));
		assertEquals("true", newObservacaoPost.get("addKeyResult"));
		
		Map<String, String> resultDelete = observacaoEndpoint.delete(newObservacaoPost);
		assertTrue(resultDelete.containsKey("date"));
		
		assertThrows(APIException.class, () -> {
			observacaoEndpoint.get(newObservacaoPost);
			
		});

	}

}
