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
import br.edu.insper.desagil.backend.db.SetorDAO;
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Pavimento;
import br.edu.insper.desagil.backend.model.Setor;


class SetorEndpointTest {
	private Map<String, String> newSetorPost;
	private SetorEndpoint setorEndpoint;
	private SetorDAO setorDAO;
	
	
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
		Map<String, String> newPavimentoPost = pavimentoEndpoint.post(null,  new Pavimento(newObraPost.get("key"), "Pavimento 12", "José Garcia"));
		
		setorDAO = new SetorDAO();
		setorDAO.deleteAll();
		setorEndpoint = new SetorEndpoint();
		newSetorPost = setorEndpoint.post(null,  new Setor(newObraPost.get("key"), "Escritório XP Investimentos", "José Garcia"));
		
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(newSetorPost.containsKey("date"));
		
		
		Setor setorGet = setorEndpoint.get(newSetorPost);
		assertEquals(newSetorPost.get("key"), setorGet.getKey());
		
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(newSetorPost.containsKey("date"));
		
		Setor setorGet = setorEndpoint.get(newSetorPost);
		setorGet.setResponsavel("Jamesson Leandro");
		
		Map<String, String> resultPut = setorEndpoint.put(newSetorPost, setorGet);
		assertTrue(resultPut.containsKey("date"));
		
		Setor modifiedSetorGet = setorEndpoint.get(newSetorPost);
		assertEquals(newSetorPost.get("key"), modifiedSetorGet.getKey());
		assertEquals("Jamesson Leandro", modifiedSetorGet.getResponsavel());

	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		assertTrue(newSetorPost.containsKey("date"));
		
		Map<String, String> resultDelete = setorEndpoint.delete(newSetorPost);
		assertTrue(resultDelete.containsKey("date"));
		
				
		assertThrows(APIException.class, () -> {
			setorEndpoint.get(newSetorPost);
		});
	}

	
}
