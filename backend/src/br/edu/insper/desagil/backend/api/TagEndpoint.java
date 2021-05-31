package br.edu.insper.desagil.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Endpoint;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.db.TagDAO;
import br.edu.insper.desagil.backend.model.Tag;

public class TagEndpoint extends Endpoint<Tag> {
	public TagEndpoint() {
		super("/tag");
	}
	
	@Override
	public Tag get(Map<String, String> args) throws APIException {
		TagDAO dao = new TagDAO();
		Tag tag;
		try {
			tag = dao.retrieve(args.get("id"));
		} catch (DBException exception) {
			return null;
		}
		return tag;
	}	
	
	@Override
	public Map<String, String> post(Map<String, String> args, Tag tag) throws APIException {
		TagDAO dao = new TagDAO();
		Date date;
		try {
			date = dao.create(tag);
		} catch (DBException exception) {
			return null;
		}
		
		Map<String, String> body = new HashMap<>();
		body.put("date", date.toString());
		
		return body;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Tag tag) throws APIException {
	    TagDAO dao = new TagDAO();
	    Date date;
	    try {
	        date = dao.update(tag);
	    } catch (DBException exception) {
	        return null;
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
	    TagDAO dao = new TagDAO();
	    Date date;
	    try {
	        date = dao.delete(args.get("id"));
	    } catch (DBException exception) {
	        return null;
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
}