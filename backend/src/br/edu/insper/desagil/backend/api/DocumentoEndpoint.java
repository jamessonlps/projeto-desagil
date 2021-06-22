package br.edu.insper.desagil.backend.api;

import java.text.SimpleDateFormat;
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
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Pavimento;
import br.edu.insper.desagil.backend.model.Setor;

public class DocumentoEndpoint extends Endpoint<Documento> {
	public DocumentoEndpoint() {
		super("/documento");
	}
	
	@Override
	public Documento get(Map<String, String> args) throws APIException {
		DocumentoDAO dao = new DocumentoDAO();
		Documento documento;
		try {
			documento = dao.retrieve(args.get("key"));
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
		
		Boolean addKeyResult = addKey(args, documento);
		body.put("addKeyResult",  addKeyResult.toString());
		
		Boolean logResult = addLog(args, documento);
		body.put("LogResult", logResult.toString());
		
		return body;

	}
	
	public boolean addKey(Map<String, String> args, Documento documento) throws APIException {
		Boolean result = false;
		try {
			if (args.containsKey("pavimento")) {
				
				Map<String, String> argsPavimento = new HashMap<>();
				argsPavimento.put("key",  args.get("pavimento"));
				
				PavimentoEndpoint pavimentoEndpoint = new PavimentoEndpoint();
				Pavimento pavimento = pavimentoEndpoint.get(argsPavimento);
				
				pavimento.addDocumento(documento.getKey());
				pavimentoEndpoint.put(argsPavimento, pavimento);
				
				result = true;
				return result;
			}
			
			else if (args.containsKey("setor")) {
				
				Map<String, String> argsSetor= new HashMap<>();
				argsSetor.put("key",  args.get("setor"));
				
				SetorEndpoint setorEndpoint = new SetorEndpoint();
				Setor setor= setorEndpoint.get(argsSetor);
				
				setor.addDocumento(documento.getKey());
				setorEndpoint.put(argsSetor, setor);
				
				result = true;
				return result;
			}
			
			else {
				return result;
			}
			
		} catch (Exception e) {
			return result;
		}
	}
	
	public boolean addLog(Map<String, String> args, Documento documento) {
		Boolean result = false;
		Date date = new Date();
		try {
			Map<String, String> argsObra = new HashMap<>();
			argsObra.put("key",  documento.getObra());
			String titulo = "";
			String log;
			
			if (args.containsKey("pavimento")) {
				Map<String, String> argsPavimento = new HashMap<>();
				argsPavimento.put("key",  args.get("pavimento"));
				
				PavimentoEndpoint pavimentoEndpoint = new PavimentoEndpoint();
				Pavimento pavimento = pavimentoEndpoint.get(argsPavimento);
				
				titulo = pavimento.getTitulo();
			}
			
			else if(args.containsKey("setor")) {
				Map<String, String> argsSetor= new HashMap<>();
				argsSetor.put("key",  args.get("setor"));
				
				SetorEndpoint setorEndpoint = new SetorEndpoint();
				Setor setor= setorEndpoint.get(argsSetor);
				
				titulo = setor.getTitulo();
			}
			
			log = new SimpleDateFormat("dd/MM/yyyy - HH:mm").format(date) 
					+ " - Um documento foi adicionado ao "
					+ titulo;
			
			ObraEndpoint obraEndpoint = new ObraEndpoint();
			Obra obra = obraEndpoint.get(argsObra);
			obra.addLog(log);
			obraEndpoint.put(argsObra, obra);		
			
			result = true;
			return result;
			
		} catch (Exception e) {
			return result;
		}
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
	        date = dao.delete(args.get("key"));
	    } catch (DBException exception) {
            throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
}
