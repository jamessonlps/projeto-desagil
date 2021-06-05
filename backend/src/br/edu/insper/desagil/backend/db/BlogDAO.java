package br.edu.insper.desagil.backend.db;

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.firestore.FirestoreDAO;
import br.edu.insper.desagil.backend.model.Blog;

public class BlogDAO extends FirestoreDAO<Blog> {
	public BlogDAO() throws APIException {
		super("blogs");
	}
}