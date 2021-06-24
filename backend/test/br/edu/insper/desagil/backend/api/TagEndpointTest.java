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
import br.edu.insper.desagil.backend.db.TagDAO;
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Tag;


class TagEndpointTest {
	private Map<String, String> newTagPost;
	private TagEndpoint tagEndpoint;
	private TagDAO tagDao;
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
		Map<String, String> obraPost = obraEndpoint.post(null, new Obra("Ponte estaiada", "Rua do Sol", "Ricardo Brennand"));
		
		tagDao = new TagDAO();
		tagDao.deleteAll();
		tagEndpoint = new TagEndpoint();
		newTagPost = tagEndpoint.post(null,  new Tag(obraPost.get("key"), "Pavimento", "Pavimento"));
	}
	

	@Test
	public void postAndGet() throws APIException {
		assertTrue(newTagPost.containsKey("date"));
		
		Tag tagGet = tagEndpoint.get(newTagPost);
		assertEquals(newTagPost.get("key"), tagGet.getKey());
				
	}
	
	@Test
	public void postPutAndGet() throws APIException {
		assertTrue(newTagPost.containsKey("date"));
		
		Tag tagGet = tagEndpoint.get(newTagPost);
		tagGet.setTipo("Setor");;
		
		Map<String, String> resultPut = tagEndpoint.put(newTagPost, tagGet);
		assertTrue(resultPut.containsKey("date"));
		
		Tag modifiedTagGet = tagEndpoint.get(newTagPost);
		assertEquals(newTagPost.get("key"), modifiedTagGet.getKey());
		assertEquals("Setor", modifiedTagGet.getTipo());

	}
	
	@Test
	public void postDeleteAndGet() throws APIException {
		assertTrue(newTagPost.containsKey("date"));

		Map<String, String> resultDelete = tagEndpoint.delete(newTagPost);
		assertTrue(resultDelete.containsKey("date"));
		
				
		assertThrows(APIException.class, () -> {
			tagEndpoint.get(newTagPost);
			
		});

	}
	
}
