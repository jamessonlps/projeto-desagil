package br.edu.insper.desagil.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Endpoint;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.db.BlogDAO;
import br.edu.insper.desagil.backend.model.Blog;

public class BlogEndpoint extends Endpoint<Blog> {
	public BlogEndpoint() {
		super("/blog");
	}
	
	@Override
	public Blog get(Map<String, String> args) throws APIException {
	BlogDAO dao = new BlogDAO();
		Blog blog;
		try {
			blog = dao.retrieve(args.get("id"));
		} catch (DBException exception) {
			return null;
		}
		return blog;
	}	
	
	@Override
	public Map<String, String> post(Map<String, String> args, Blog blog) throws APIException {
		BlogDAO dao = new BlogDAO();
		Date date;
		try {
			date = dao.create(blog);
		} catch (DBException exception) {
			return null;
		}
		
		Map<String, String> body = new HashMap<>();
		body.put("date", date.toString());
		
		return body;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Blog blog) throws APIException {
		BlogDAO dao = new BlogDAO();
	    Date date;
	    try {
	        date = dao.update(blog);
	    } catch (DBException exception) {
	        return null;
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
		BlogDAO dao = new BlogDAO();
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

