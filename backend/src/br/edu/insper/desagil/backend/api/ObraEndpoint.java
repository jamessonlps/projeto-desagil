package br.edu.insper.desagil.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Endpoint;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.core.exception.DatabaseRequestException;
import br.edu.insper.desagil.backend.db.ObraDAO;
import br.edu.insper.desagil.backend.model.Obra;

public class ObraEndpoint extends Endpoint<Obra> {
	public ObraEndpoint() {
		super("/obra");
	}
	
	@Override
	public Obra get(Map<String, String> args) throws APIException {
		ObraDAO dao = new ObraDAO();
		Obra obra;
		try {
			obra = dao.retrieve(args.get("key"));
		} catch (DBException exception) {
            throw new DatabaseRequestException(exception);
		}
		return obra;
	}	
	
	@Override
	public Map<String, String> post(Map<String, String> args, Obra obra) throws APIException {
		ObraDAO dao = new ObraDAO();
		Date date;
		try {
			date = dao.create(obra);
		}  catch (DBException exception) {
            throw new DatabaseRequestException(exception);
		}
		
		Map<String, String> body = new HashMap<>();
		body.put("date", date.toString());
		body.put("key", obra.getKey());
		
		return body;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Obra obra) throws APIException {
		ObraDAO dao = new ObraDAO();
	    Date date;
	    try {
	        date = dao.update(obra);
	    } catch (DBException exception) {
            throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
		ObraDAO dao = new ObraDAO();
	    Date date;
	    try {
	        date = dao.delete(args.get("key"));
	    }  catch (DBException exception) {
            throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
}
