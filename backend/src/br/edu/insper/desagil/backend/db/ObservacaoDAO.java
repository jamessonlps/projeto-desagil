package br.edu.insper.desagil.backend.db;

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.firestore.FirestoreDAO;
import br.edu.insper.desagil.backend.model.Observacao;

public class ObservacaoDAO extends FirestoreDAO<Observacao> {
	public ObservacaoDAO() throws APIException {
		super("observacoes");
	}

}
