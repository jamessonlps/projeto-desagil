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
import br.edu.insper.desagil.backend.model.Obra;


class ObraEndpointTest {
	private ObraEndpoint endpoint;
	private Map<String, String> args;
	private Obra obra;
	private ObraDAO dao;
	private Map<String, String> resultPost;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		endpoint = new ObraEndpoint();
		args = new HashMap<>();
		dao = new ObraDAO();
		dao.deleteAll();
		
		obra = new Obra(11111, "Obra magnífica de Gizé");
		
		args.put("codigo", "11111");
		resultPost = endpoint.post(args, obra);
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		Obra obraGet = endpoint.get(args);
		assertEquals(11111, obraGet.getCodigo());
				
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		obra.setTitulo("Obra Ainda mais Magnífica de Gizé");
		Map<String, String> resultPut = endpoint.put(args, obra);
		assertTrue(resultPut.containsKey("date"));
		
		Obra obraGet = endpoint.get(args);
		assertEquals(11111, obraGet.getCodigo());
		assertEquals("Obra Ainda mais Magnífica de Gizé", obraGet.getTitulo());
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
