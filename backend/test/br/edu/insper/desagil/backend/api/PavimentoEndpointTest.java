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
import br.edu.insper.desagil.backend.db.PavimentoDAO;
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Pavimento;


class PavimentoEndpointTest {
	private PavimentoEndpoint endpoint;
	private Map<String, String> args;
	private Pavimento pavimento;
	private PavimentoDAO dao;
	private Map<String, String> resultPost;
	private ObraEndpoint obraEndpoint;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}

	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		obraEndpoint = new ObraEndpoint();
		Map<String, String> obraPost = obraEndpoint.post(null, new Obra("Ponte estaiada", "Rua do Sol", "Ricardo Brennand"));
		endpoint = new PavimentoEndpoint();
		args = new HashMap<>();
		dao = new PavimentoDAO();
		dao.deleteAll();
		
		pavimento = new Pavimento(obraPost.get("key"), "Stairway to Heaven", "Jimmy Page");
		Map<String, String> pavimentoPost = endpoint.post(null, pavimento);
		
		args.put("key", pavimentoPost.get("key"));
		resultPost = endpoint.post(args, pavimento);
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		Pavimento pavimentoGet = endpoint.get(args);
		assertEquals(args.get("key"), pavimentoGet.getKey());
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		Pavimento pavimentoGet = endpoint.get(args);
		pavimentoGet.setTitulo("This is NOT Heaven");
		
		Map<String, String> resultPut = endpoint.put(args, pavimentoGet);
		assertTrue(resultPut.containsKey("date"));
		
		Pavimento pavimentoFinalGet = endpoint.get(args);
		
		assertEquals(args.get("key"), pavimentoFinalGet.getKey());
		assertEquals("This is NOT Heaven", pavimentoFinalGet.getTitulo());

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
