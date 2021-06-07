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
import br.edu.insper.desagil.backend.model.Documento;


class DocumentoEndpointTest {
	private DocumentoEndpoint endpoint;
	private Map<String, String> args;
	private Documento documento;
	private DocumentoDAO dao;
	private Map<String, String> resultPost;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		endpoint = new DocumentoEndpoint();
		args = new HashMap<>();
		dao = new DocumentoDAO();
		dao.deleteAll();
		
		documento = new Documento(223, 10102, "Toca do Larry", "Planta Baixa", "https://firebasestorage.googleapis.com/v0/"
				+ "b/desagil-guijavan.appspot.com/o/10-15%20PLANTA%20BAIXA%201oPAV%20ARQ05.pdf?alt=media&token=c286b7f9-a664-4538-8fc9-81087700fc34");
		
		args.put("codigo", "223");
		resultPost = endpoint.post(args, documento);
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		Documento documentoGet = endpoint.get(args);
		assertEquals(223, documentoGet.getCodigo());
				
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		documento.setTitulo("Toca do Dragao");
		Map<String, String> resultPut = endpoint.put(args, documento);
		assertTrue(resultPut.containsKey("date"));
		
		Documento documentoGet = endpoint.get(args);
		assertEquals(223, documentoGet.getCodigo());
		assertEquals("Toca do Dragao", documentoGet.getTitulo());
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));

		Map<String, String> resultDelete = endpoint.delete(args);
		assertTrue(resultDelete.containsKey("date"));
		
				
		APIException exception = assertThrows(APIException.class, () -> {
			endpoint.get(args);
			
		});

	}
	
}
