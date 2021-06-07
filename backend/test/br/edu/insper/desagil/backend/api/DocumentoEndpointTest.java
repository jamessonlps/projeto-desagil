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
import br.edu.insper.desagil.backend.db.DocumentoDAO;
import br.edu.insper.desagil.backend.model.Documento;


class DocumentoEndpointTest
	private DocumentoEndpoint endpoint;
	private Map<String, String> args;
	private Documento documento;
	private DocumentoDAO dao;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}
	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		endpoint = new DocumentoEndpoint();
		args = new HashMap<>();
		dao = new DocumentoDAO();
		dao.deleteAll();
		
	}
	

	@Test
	public void postAndGet() throws APIException {
		
		ArrayList<String> obs = new ArrayList<>();
		obs.add("Piso torto");
		obs.add("Chao sujo");
        
		documento = new Documento(223, 10102, "Toca do Larry", "Planta Baixa", "Planta arquitetônica",  12, "https://firebasestorage.googleapis.com/v0/b/desagil-guijavan.appspot.com/o/10-15%20PLANTA%20BAIXA%201oPAV%20ARQ05.pdf?alt=media&token=c286b7f9-a664-4538-8fc9-81087700fc34", "Thu Jun 03 17:34:10 BRT 2021", "Thu Jun 03 17:35:10 BRT 2021", obs);
		
		Map<String, String> result = endpoint.post(args, documento);
		assertTrue(result.containsKey("date"));
		
		args.put("codigo", "223");
		Documento documentoGet = endpoint.get(args);
		assertEquals(10102, documentoGet.getCodigo());
		
		
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		ArrayList<String> obs = new ArrayList<>();
		obs.add("Piso torto");
		obs.add("Chao sujo");
        
		documento = new Documento(223, 10102, "Toca do Larry", "Planta Baixa", "Planta arquitetônica",  12, "https://firebasestorage.googleapis.com/v0/b/desagil-guijavan.appspot.com/o/10-15%20PLANTA%20BAIXA%201oPAV%20ARQ05.pdf?alt=media&token=c286b7f9-a664-4538-8fc9-81087700fc34", "Thu Jun 03 17:34:10 BRT 2021", "Thu Jun 03 17:35:10 BRT 2021", obs);
				
		Map<String, String> resultPost = endpoint.post(args, documento);
		assertTrue(resultPost.containsKey("date"));
		
		
		documento.setReferencia("10101");
		args.put("codigo", "223");
		Map<String, String> resultPut = endpoint.put(args, documento);
		assertTrue(resultPut.containsKey("date"));
		
		
		Documento documentoGet = endpoint.get(args);
		assertEquals(223, documentoGet.getCodigo());
		assertEquals(10102, documentoGet.getObra());
		assertEquals("https://firebasestorage.googleapis.com/v0/b/desagil-guijavan.appspot.com/o/10-15%20PLANTA%20BAIXA%201oPAV%20ARQ05.pdf?alt=media&token=c286b7f9-a664-4538-8fc9-81087700fc34", documentoGet.getUrl());
		assertEquals("Thu Jun 03 17:35:10 BRT 2021", documentoGet.getUltimaModificacao());
		assertEquals("Toca do Larry", documentoGet.getTitulo());
		assertEquals("10101", documentoGet.getReferencia());
		
	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		ArrayList<String> obs = new ArrayList<>();
		obs.add("Piso torto");
		obs.add("Chao sujo");
        
		documento = new Documento(223, 10102, "Toca do Larry", "Planta Baixa", "Planta arquitetônica",  12, "https://firebasestorage.googleapis.com/v0/b/desagil-guijavan.appspot.com/o/10-15%20PLANTA%20BAIXA%201oPAV%20ARQ05.pdf?alt=media&token=c286b7f9-a664-4538-8fc9-81087700fc34", "Thu Jun 03 17:34:10 BRT 2021", "Thu Jun 03 17:35:10 BRT 2021", obs);
			
		Map<String, String> resultPost = endpoint.post(args, documento);
		assertTrue(resultPost.containsKey("date"));
		
		args.put("codigo", "223");
		Map<String, String> resultDelete = endpoint.delete(args);
		assertTrue(resultDelete.containsKey("date"));
		
		APIException exception = assertThrows(APIException.class, () -> {
			endpoint.get(args);
			
		});

	}
	
}
