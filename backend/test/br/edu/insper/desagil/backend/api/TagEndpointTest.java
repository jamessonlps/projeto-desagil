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
import br.edu.insper.desagil.backend.db.TagDAO;
import br.edu.insper.desagil.backend.model.Tag;


class TagEndpointTest {
	private TagEndpoint endpoint;
	private Map<String, String> args;
	private Tag tag;
	private TagDAO dao;
	private Map<String, String> resultPost;
	
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
		
		tag = new Tag(88997, 1111, 2222, "Pavimento");
		
		args.put("id", "88997");
		resultPost = endpoint.post(args, tag);
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		Tag tagGet = endpoint.get(args);
		assertEquals(88997, tagGet.getId());
				
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(resultPost.containsKey("date"));
		
		tag.setTipo("Setor");
		Map<String, String> resultPut = endpoint.put(args, tag);
		assertTrue(resultPut.containsKey("date"));
		
		Tag tagGet = endpoint.get(args);
		assertEquals(88997, tagGet.getId());
		assertEquals("Setor", tagGet.getTipo());
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
