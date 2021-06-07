package br.edu.insper.desagil.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Endpoint;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.db.PostDAO;
import br.edu.insper.desagil.backend.model.Post;

public class PostEndpoint extends Endpoint<Post> {
	public PostEndpoint() {
		super("/post");
	}
	
	@Override
	public Post get(Map<String, String> args) throws APIException {
		PostDAO dao = new PostDAO();
		Post post;
		try {
			post = dao.retrieve(args.get("id"));
		} catch (DBException exception) {
			return null;
		}
		return post;
	}	
	
	@Override
	public Map<String, String> post(Map<String, String> args, Post post) throws APIException {
		PostDAO dao = new PostDAO();
		Date date;
		try {
			date = dao.create(post);
		} catch (DBException exception) {
			return null;
		}
		
		Map<String, String> body = new HashMap<>();
		body.put("date", date.toString());
		
		return body;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Post post) throws APIException {
	    PostDAO dao = new PostDAO();
	    Date date;
	    try {
	        date = dao.update(post);
	    } catch (DBException exception) {
	        return null;
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
	    PostDAO dao = new PostDAO();
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
