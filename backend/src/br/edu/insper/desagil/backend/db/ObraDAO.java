package br.edu.insper.desagil.backend.db;

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.firestore.FirestoreDAO;
import br.edu.insper.desagil.backend.model.Obra;

public class ObraDAO extends FirestoreDAO<Obra> {
	public ObraDAO() throws APIException {
		super("obras");
	}

}
