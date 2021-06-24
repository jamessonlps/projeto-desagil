package br.edu.insper.desagil.backend.api;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

import java.io.IOException;
import java.util.Map;


import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.db.ObraDAO;
import br.edu.insper.desagil.backend.db.PavimentoDAO;
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Pavimento;

class PavimentoEndpointTest {
	private Map<String, String> newPavimentoPost;
	private PavimentoEndpoint pavimentoEndpoint;
	private PavimentoDAO pavimentoDAO;

	private ObraEndpoint obraEndpoint;
	private ObraDAO obraDAO;
	
	@BeforeAll
	public static void initialSetUp() throws IOException {
		Backend.init("firestore_test.json");
	}

	
	@BeforeEach 
	public void setUp() throws APIException, DBException {
		obraDAO = new ObraDAO();
		obraDAO.deleteAll();
		obraEndpoint = new ObraEndpoint();
		Map<String, String> newObraPost = obraEndpoint.post(null,  new Obra("FL Square", "Faria Lima 1082", "Oscar Niemeyer"));
		
		pavimentoDAO = new PavimentoDAO();
		pavimentoDAO.deleteAll();
		pavimentoEndpoint = new PavimentoEndpoint();
		newPavimentoPost = pavimentoEndpoint.post(null,  new Pavimento(newObraPost.get("key"), "Stairway to Heaven", "Jimmy Page"));

	}
	
	@Test
	public void postAndGet() throws APIException {
		assertTrue(newPavimentoPost.containsKey("date"));
		
		Pavimento pavimentoGet = pavimentoEndpoint.get(newPavimentoPost);
		assertEquals(newPavimentoPost.get("key"), pavimentoGet.getKey());
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(newPavimentoPost.containsKey("date"));
		
		Pavimento pavimentoGet = pavimentoEndpoint.get(newPavimentoPost);
		pavimentoGet.setTitulo("This is NOT Heaven");
		
		Map<String, String> resultPut = pavimentoEndpoint.put(newPavimentoPost, pavimentoGet);
		assertTrue(resultPut.containsKey("date"));
		
		Pavimento pavimentoFinalGet = pavimentoEndpoint.get(newPavimentoPost);
		assertEquals(newPavimentoPost.get("key"), pavimentoFinalGet.getKey());
		assertEquals("This is NOT Heaven", pavimentoFinalGet.getTitulo());

	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		assertTrue(newPavimentoPost.containsKey("date"));

		Map<String, String> resultDelete = pavimentoEndpoint.delete(newPavimentoPost);
		assertTrue(resultDelete.containsKey("date"));
				
		assertThrows(APIException.class, () -> {
			pavimentoEndpoint.get(newPavimentoPost);
			
		});

	}
	
}
