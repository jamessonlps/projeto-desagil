package br.edu.insper.desagil.backend.api;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.core.exception.NotFoundException;
import br.edu.insper.desagil.backend.db.PavimentoDAO;
import br.edu.insper.desagil.backend.model.Pavimento;


class PavimentoEndpointTest {
	private PavimentoEndpoint endpoint;
	private Map<String, String> args;
	private Pavimento pavimento;
	private PavimentoDAO dao;
	private Map<String, String> resultPost;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		endpoint = new PavimentoEndpoint();
		args = new HashMap<>();
		dao = new PavimentoDAO();
		dao.deleteAll();
		
		pavimento = new Pavimento(123456, 2222, "Stairway to Heaven", "Jimmy Page");
		
		args.put("codigo", "123456");
		resultPost = endpoint.post(args, pavimento);
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		Pavimento pavimentoGet = endpoint.get(args);
		assertEquals(123456, pavimentoGet.getCodigo());
				
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		pavimento.setTitulo("This is NOT Heaven");
		Map<String, String> resultPut = endpoint.put(args, pavimento);
		assertTrue(resultPut.containsKey("date"));
		
		Pavimento pavimentoGet = endpoint.get(args);
		assertEquals(123456, pavimentoGet.getCodigo());
		assertEquals("This is NOT Heaven", pavimentoGet.getTitulo());
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
