package br.edu.insper.desagil.backend.db;

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.firestore.FirestoreDAO;
import br.edu.insper.desagil.backend.model.Post;

public class PostDAO extends FirestoreDAO<Post> {
	public PostDAO() throws APIException {
		super("posts");
	}
}