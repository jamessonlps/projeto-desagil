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
	private Map<String, String> args;
	private Obra obra;
	private ObraDAO dao;
	private Map<String, String> resultPost;
	private ObraEndpoint obraEndpoint;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		obraEndpoint = new ObraEndpoint();
		args = new HashMap<>();
		
		dao = new ObraDAO();
		dao.deleteAll();
		
		obra = new Obra("Ponte estaiada", "Rua da lua", "Thierry da Silva");
		Map<String, String> obraPost = obraEndpoint.post(null, obra);
		
		args.put("key", obraPost.get("key"));
		resultPost = obraEndpoint.post(args, obra);
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		Obra obraGet = obraEndpoint.get(resultPost);
		assertEquals(resultPost.get("key"), obraGet.getKey());
				
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		Obra obraGet = obraEndpoint.get(resultPost);
		obraGet.setResponsavel("Jackson Leonardo");
		
		Map<String, String> resultPut = obraEndpoint.put(resultPost, obraGet);
		assertTrue(resultPut.containsKey("date"));
		
		Obra modifiedObraGet = obraEndpoint.get(resultPost);
		assertEquals(resultPost.get("key"), modifiedObraGet.getKey());
		assertEquals("Jackson Leonardo", modifiedObraGet.getResponsavel());
		
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));

		Map<String, String> resultDelete = obraEndpoint.delete(args);
		assertTrue(resultDelete.containsKey("date"));
		
				
		assertThrows(APIException.class, () -> {
			obraEndpoint.get(args);
			
		});

	}
	
}
