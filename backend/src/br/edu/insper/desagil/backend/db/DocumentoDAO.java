package br.edu.insper.desagil.backend.db;

import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.firestore.FirestoreDAO;
import br.edu.insper.desagil.backend.model.Documento;

public class DocumentoDAO extends FirestoreDAO<Documento> {
	public DocumentoDAO() throws APIException {
		super("documentos");
	}

}
