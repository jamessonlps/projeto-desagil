package br.edu.insper.desagil.backend.db;

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.firestore.FirestoreDAO;
import br.edu.insper.desagil.backend.model.Pavimento;

public class PavimentoDAO extends FirestoreDAO<Pavimento> {
	public PavimentoDAO() throws APIException {
		super("pavimentos");
	}

}
