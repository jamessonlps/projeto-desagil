package br.edu.insper.desagil.backend.api;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
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


class SetorEndpointTest
	private SetorEndpoint endpoint;
	private Map<String, String> args;
	private Setor setor;
	private setorDAO dao;
	
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
		
	}
	

	@Test
	public void postAndGet() throws APIException {
		
		ArrayList<String> docs = new ArrayList<>();
		docs.add(223);
		docs.add(3301);
        
		setor = new Setor(12, 10102, "Toca do Larry", "Gabriel", 1212, docs);
		
		Map<String, String> result = endpoint.post(args, setor);
		assertTrue(result.containsKey("date"));
		
		args.put("codigo", "12");
		Setor setorGet = endpoint.get(args);
		assertEquals(12, setorGet.getCodigo());
		
		
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		
		ArrayList<String> docs = new ArrayList<>();
		docs.add(223);
		docs.add(3301);
        
		setor = new Setor(12, 10102, "Toca do Larry", "Gabriel", 1212, docs);
		
		Map<String, String> resultPost = endpoint.post(args, setor);
		assertTrue(resultPost.containsKey("date"));
		
		
		setor.setResponsavel("James");
		args.put("codigo", "12");
		Map<String, String> resultPut = endpoint.put(args, setor);
		assertTrue(resultPut.containsKey("date"));
		
		
		Setor setorGet = endpoint.get(args);
		assertEquals(12, setorGet.getCodigo());
		assertEquals(10102, setorGet.getObra());
		assertEquals(1212, setorGet.getIdPavimento());
		assertEquals("Toca do Larry", setorGet.getTitulo());
		assertEquals("James", setorGet.getResponsavel());
		
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		ArrayList<String> docs = new ArrayList<>();
		docs.add(223);
		docs.add(3301);
        
		setor = new Setor(12, 10102, "Toca do Larry", "Gabriel", 1212, docs);
		
		Map<String, String> resultPost = endpoint.post(args, setor);
		assertTrue(resultPost.containsKey("date"));
		
		args.put("codigo", "12");
		Map<String, String> resultDelete = endpoint.delete(args);
		assertTrue(resultDelete.containsKey("date"));
		
		APIException exception = assertThrows(APIException.class, () -> {
			endpoint.get(args);
			
		});

	}
	
}
