package br.edu.insper.desagil.backend.db;

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.firestore.FirestoreDAO;
import br.edu.insper.desagil.backend.model.Setor;

public class SetorDAO extends FirestoreDAO<Setor> {
	public SetorDAO() throws APIException {
		super("setores");
	}

}
