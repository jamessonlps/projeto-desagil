package br.edu.insper.desagil.backend.db;

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.firestore.FirestoreDAO;
import br.edu.insper.desagil.backend.model.Tag;

public class TagDAO extends FirestoreDAO<Tag> {
	public TagDAO() throws APIException {
		super("tags");
	}

}