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
import br.edu.insper.desagil.backend.db.DocumentoDAO;
import br.edu.insper.desagil.backend.db.ObraDAO;
import br.edu.insper.desagil.backend.db.SetorDAO;
import br.edu.insper.desagil.backend.model.Documento;
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Setor;


class DocumentoEndpointTest {
	private Map<String, String> newDocumentoPost;
	private DocumentoEndpoint documentoEndpoint;
	private DocumentoDAO documentoDAO;
	
	private Map<String, String> newSetorPost;
	private SetorEndpoint setorEndpoint;
	private SetorDAO setorDAO;
	
	private ObraEndpoint obraEndpoint;
	private ObraDAO obraDAO;
	
	private Map<String, String> argsDoc;
	
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
		
		argsDoc = new HashMap<>();
		argsDoc.put("setor", newSetorPost.get("key"));
		
		documentoDAO = new DocumentoDAO();
		documentoDAO.deleteAll();
		documentoEndpoint = new DocumentoEndpoint();
		newDocumentoPost = documentoEndpoint.post(argsDoc,  new Documento(newObraPost.get("key"),"Toca do Larry", "Planta Baixa", "https://firebasestorage.googleapis.com/v0/"
				+ "b/desagil-guijavan.appspot.com/o/10-15%20PLANTA%20BAIXA%201oPAV%20ARQ05.pdf?alt=media&token=c286b7f9-a664-4538-8fc9-81087700fc34"));
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(newDocumentoPost.containsKey("date"));
		assertEquals("true", newDocumentoPost.get("addKeyResult"));
		
		Documento documentoGet = documentoEndpoint.get(newDocumentoPost);
		assertEquals(newDocumentoPost.get("key"), documentoGet.getKey());			
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(newDocumentoPost.containsKey("date"));
		assertEquals("true", newDocumentoPost.get("addKeyResult"));
		
		Documento documentoGet = documentoEndpoint.get(newDocumentoPost);
		documentoGet.setTitulo("Toca do Lula");
		
		Map<String, String> resultPut = documentoEndpoint.put(newDocumentoPost, documentoGet);
		assertTrue(resultPut.containsKey("date"));
		
		Documento modifiedDocumentoGet = documentoEndpoint.get(newDocumentoPost);
		assertEquals(newDocumentoPost.get("key"), modifiedDocumentoGet.getKey());
		assertEquals("Toca do Lula", modifiedDocumentoGet.getTitulo());
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		assertTrue(newDocumentoPost.containsKey("date"));
		assertEquals("true", newDocumentoPost.get("addKeyResult"));
		
		Map<String, String> resultDelete = documentoEndpoint.delete(newDocumentoPost);
		assertTrue(resultDelete.containsKey("date"));
		
		assertThrows(APIException.class, () -> {
			documentoEndpoint.get(newDocumentoPost);
			
		});

	}
	
}
