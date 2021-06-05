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
import br.edu.insper.desagil.backend.db.ObraDAO;
import br.edu.insper.desagil.backend.model.Obra;


class ObraEndpointTest
	private ObraEndpoint endpoint;
	private Map<String, String> args;
	private Obra obra;
	private ObraDAO dao;
	
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
		
	}
	

	@Test
	public void postAndGet() throws APIException {
		
		ArrayList<String> logs = new ArrayList<>();
		ArrayList<String> alertas = new ArrayList<>();
		logs.add("Piso torto");
		logs.add("Chao sujo");
		alertas.add("Piso torto");
        
		obra = new Obra(10102, "Toca do Larry", "Rua Alvorada", "Pedro",  logs, alertas);
		
		Map<String, String> result = endpoint.post(args, obra);
		assertTrue(result.containsKey("date"));
		
		args.put("codigo", "10102");
		Obra obraGet = endpoint.get(args);
		assertEquals(10102, obraGet.getCodigo());
		
		
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		ArrayList<String> logs = new ArrayList<>();
		ArrayList<String> alertas = new ArrayList<>();
		logs.add("Piso torto");
		logs.add("Chao sujo");
		alertas.add("Piso torto");
        
		obra = new Obra(10102, "Toca do Larry", "Rua Alvorada", "Pedro",  logs, alertas);		
		Map<String, String> resultPost = endpoint.post(args, obra);
		assertTrue(resultPost.containsKey("date"));
		
		
		obra.setResponsavel("Gabriel");
		args.put("codigo", "10102");
		Map<String, String> resultPut = endpoint.put(args, obra);
		assertTrue(resultPut.containsKey("date"));
		
		
		Obra obraGet = endpoint.get(args);
		assertEquals(10102, obraGet.getCodigo());
		assertEquals("Toca do Larry", obraGet.getTitulo());
		assertEquals("Rua Alvorada", obraGet.getEndereco());
		assertEquals(logs, obraGet.getLogs());
		assertEquals(alertas, obraGet.getAlertas());

		assertEquals("Gabriel", obraGet.getResponsavel());
		
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		ArrayList<String> logs = new ArrayList<>();
		ArrayList<String> alertas = new ArrayList<>();
		logs.add("Piso torto");
		logs.add("Chao sujo");
		alertas.add("Piso torto");
        
		obra = new Obra(10102, "Toca do Larry", "Rua Alvorada", "Pedro",  logs, alertas);
		
		Map<String, String> resultPost = endpoint.post(args, obra);
		assertTrue(resultPost.containsKey("date"));
		
		args.put("codigo", "10102");
		Map<String, String> resultDelete = endpoint.delete(args);
		assertTrue(resultDelete.containsKey("date"));
		
		APIException exception = assertThrows(APIException.class, () -> {
			endpoint.get(args);
			
		});

	}
	
}
