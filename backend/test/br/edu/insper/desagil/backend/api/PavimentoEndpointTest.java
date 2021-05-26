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

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.NotFoundException;
import br.edu.insper.desagil.backend.model.Pavimento;


class PavimentoEndpointTest {
	private PavimentoEndpoint endpoint;
	private Map<String, String> args;
	private Pavimento pavimento;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		FileInputStream stream = new FileInputStream("firestore.json");
		FirebaseOptions options = FirebaseOptions.builder()
			.setCredentials(GoogleCredentials.fromStream(stream))
			.build();
		FirebaseApp.initializeApp(options);
	}
	
	
	@BeforeEach 
	public void setUp() {
		endpoint = new PavimentoEndpoint();
		args = new HashMap<>();

		
	}
	

	@Test
	public void postAndGet() throws APIException {
		
		pavimento = new Pavimento(130002001, "Pavimento Teste 01", "Victor");
		
		Map<String, String> result = endpoint.post(args, pavimento);
		assertTrue(result.containsKey("date"));
		
		args.put("codigo", "130002001");
		Pavimento pavimentoGet = endpoint.get(args);
		assertEquals(130002001, pavimentoGet.getCodigo());
		
		
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		pavimento = new Pavimento(130002002, "Pavimento Teste 02", "Victor");
		Map<String, String> resultPost = endpoint.post(args, pavimento);
		assertTrue(resultPost.containsKey("date"));
		
		
		pavimento.setResponsavel("Jamesson");
		args.put("codigo", "130002002");
		Map<String, String> resultPut = endpoint.put(args, pavimento);
		assertTrue(resultPut.containsKey("date"));
		
		
		Pavimento pavimentoGet = endpoint.get(args);
		assertEquals(130002002, pavimentoGet.getCodigo());
		assertEquals("Pavimento Teste 02", pavimentoGet.getTitulo());
		assertEquals("Jamesson", pavimentoGet.getResponsavel());
		
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		pavimento = new Pavimento(130002003, "Pavimento Teste 03", "Victor");
		Map<String, String> resultPost = endpoint.post(args, pavimento);
		assertTrue(resultPost.containsKey("date"));
		
		args.put("codigo", "130002003");
		Map<String, String> resultDelete = endpoint.delete(args);
		assertTrue(resultDelete.containsKey("date"));
		
		APIException exception = assertThrows(APIException.class, () -> {
			endpoint.get(args);
			
		});

	}
	
}
