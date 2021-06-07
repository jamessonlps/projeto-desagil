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
import br.edu.insper.desagil.backend.db.SetorDAO;
import br.edu.insper.desagil.backend.model.Setor;


class SetorEndpointTest {
	private SetorEndpoint endpoint;
	private Map<String, String> args;
	private Setor setor;
	private SetorDAO dao;
	private Map<String, String> resultPost;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		endpoint = new SetorEndpoint();
		args = new HashMap<>();
		dao = new SetorDAO();
		dao.deleteAll();
		
		setor= new Setor(34, 1111, "Estacao 9 3/4", 12345);
		
		args.put("codigo", "34");
		resultPost = endpoint.post(args, setor);
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		Setor setorGet = endpoint.get(args);
		assertEquals(34, setorGet.getCodigo());
				
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		setor.setTitulo("Estacao Simples de Trem");
		Map<String, String> resultPut = endpoint.put(args, setor);
		assertTrue(resultPut.containsKey("date"));
		
		Setor setorGet = endpoint.get(args);
		assertEquals(34, setorGet.getCodigo());
		assertEquals("Estacao Simples de Trem", setorGet.getTitulo());
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
