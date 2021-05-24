package br.edu.insper.desagil.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Endpoint;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.db.PavimentoDAO;
import br.edu.insper.desagil.backend.model.Pavimento;

public class PavimentoEndpoint extends Endpoint<Pavimento> {
	public PavimentoEndpoint() {
		super("/pavimento");
	}
	
//	MÉTODOS DE PAVIMENTO:
	@Override
	public Pavimento get(Map<String, String> args) throws APIException {
		PavimentoDAO dao = new PavimentoDAO();
		Pavimento pavimento;
		try {
			pavimento = dao.retrieve(args.get("codigo"));
		} catch (DBException exception) {
			return null;
		}
		return pavimento;
	}	
	
	@Override
	public Map<String, String> post(Map<String, String> args, Pavimento pavimento) throws APIException {
		PavimentoDAO dao = new PavimentoDAO();
		Date date;
		try {
			date = dao.create(pavimento);
		} catch (DBException exception) {
			return null;
		}
		
		Map<String, String> body = new HashMap<>();
		body.put("date", date.toString());
		
		return body;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Pavimento pavimento) throws APIException {
	    PavimentoDAO dao = new PavimentoDAO();
	    Date date;
	    try {
	        date = dao.update(pavimento);
	    } catch (DBException exception) {
	        return null;
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
	    PavimentoDAO dao = new PavimentoDAO();
	    Date date;
	    try {
	        date = dao.delete(args.get("codigo"));
	    } catch (DBException exception) {
	        return null;
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
}
