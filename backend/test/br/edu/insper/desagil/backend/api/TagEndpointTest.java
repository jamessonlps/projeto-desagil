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
import br.edu.insper.desagil.backend.db.TagDAO;
import br.edu.insper.desagil.backend.model.Tag;


class TagEndpointTest
	private TagEndpoint endpoint;
	private Map<String, String> args;
	private Tag tag;
	private tagDAO dao;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		endpoint = new TagEndpoint();
		args = new HashMap<>();
		dao = new TagDAO();
		dao.deleteAll();
		
	}
	

	@Test
	public void postAndGet() throws APIException {
        
		tag = new Tag(12340, 12, 10102,"Pavimento");
		
		Map<String, String> result = endpoint.post(args, tag);
		assertTrue(result.containsKey("date"));
		
		args.put("id", "12340");
		Tag tagGet = endpoint.get(args);
		assertEquals(12, tagGet.getCodigo());
		
		
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		
		tag = new Tag(12340, 12, 10102,"Pavimento");
		
		Map<String, String> resultPost = endpoint.post(args, tag);
		assertTrue(resultPost.containsKey("date"));
		
		
		tag.setAlvo(1212);
		args.put("id", "12340");
		Map<String, String> resultPut = endpoint.put(args, tag);
		assertTrue(resultPut.containsKey("date"));
		
		
		Tag tagGet = endpoint.get(args);
		assertEquals(12340, tagGet.getID());
		assertEquals("Pavimento", tagGet.getTipo());
		assertEquals(10102, tagGet.getObra());
		assertEquals(1212, tagGet.getAlvo());
		
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		tag = new Tag(12340, 12, 10102,"Pavimento");
		
		Map<String, String> resultPost = endpoint.post(args, tag);
		assertTrue(resultPost.containsKey("date"));
		
		args.put("id", "12340");
		Map<String, String> resultDelete = endpoint.delete(args);
		assertTrue(resultDelete.containsKey("date"));
		
		APIException exception = assertThrows(APIException.class, () -> {
			endpoint.get(args);
			
		});

	}
	
}
