package br.edu.insper.desagil.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Endpoint;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.core.exception.DatabaseRequestException;
import br.edu.insper.desagil.backend.db.DocumentoDAO;
import br.edu.insper.desagil.backend.model.Documento;

public class DocumentoEndpoint extends Endpoint<Documento> {
	public DocumentoEndpoint() {
		super("/documento");
	}
	
	@Override
	public Documento get(Map<String, String> args) throws APIException {
		DocumentoDAO dao = new DocumentoDAO();
		Documento documento;
		try {
			documento = dao.retrieve(args.get("codigo"));
		} catch (DBException exception) {
            throw new DatabaseRequestException(exception);
		}
		return documento;
	}	
	
	@Override 
	public List<Documento> getList(Map<String, String> args) throws APIException {
		List<Documento> documentos;
		DocumentoDAO dao = new DocumentoDAO();
		String arg = args.get("documentos");
		List<String> codigos = split(arg,  ",");
		
		try {
			documentos = dao.retrieve(codigos);
		} catch (DBException exception) {
            throw new DatabaseRequestException(exception);
		}
		
		return documentos;
		
	}
	
	@Override
	public Map<String, String> post(Map<String, String> args, Documento documento) throws APIException {
		DocumentoDAO dao = new DocumentoDAO();
		Date date;
		try {
			date = dao.create(documento);
		} catch (DBException exception) {
            throw new DatabaseRequestException(exception);
		}
		
		Map<String, String> body = new HashMap<>();
		body.put("date", date.toString());
		body.put("key", documento.getKey());
		
		return body;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Documento documento) throws APIException {
		DocumentoDAO dao = new DocumentoDAO();
		Date date;
	    try {
	        date = dao.update(documento);
	    } catch (DBException exception) {
            throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
		DocumentoDAO dao = new DocumentoDAO();
		Date date;
	    try {
	        date = dao.delete(args.get("codigo"));
	    } catch (DBException exception) {
            throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
}
