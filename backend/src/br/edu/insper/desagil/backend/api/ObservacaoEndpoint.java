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
import br.edu.insper.desagil.backend.db.ObservacaoDAO;
import br.edu.insper.desagil.backend.model.Obra;
import br.edu.insper.desagil.backend.model.Observacao;
import br.edu.insper.desagil.backend.model.Pavimento;
import br.edu.insper.desagil.backend.model.Setor;

public class ObservacaoEndpoint extends Endpoint<Observacao> {
	public ObservacaoEndpoint() {
		super("/observacao");
	}
	
	
	@Override
	public Observacao get(Map<String, String> args) throws APIException {
		ObservacaoDAO dao = new ObservacaoDAO();
		Observacao observacao;
		try {
			observacao = dao.retrieve(args.get("key"));
		} catch (DBException exception) {
			throw new DatabaseRequestException(exception);
		}
		return observacao;
	}	
	
	@Override 
	public List<Observacao> getList(Map<String, String> args) throws APIException {
		List<Observacao> observacoes;
		ObservacaoDAO dao = new ObservacaoDAO();
		String arg = args.get("observacoes");
		List<String> codigos = split(arg,  ",");
		
		try {
			observacoes = dao.retrieve(codigos);
		} catch (DBException exception) {
			throw new DatabaseRequestException(exception);
		}
		
		return observacoes;
		
	}
	
	@Override
	public Map<String, String> post(Map<String, String> args, Observacao observacao) throws APIException {
		ObservacaoDAO dao = new ObservacaoDAO();
		Date date;
		try {
			
			date = dao.create(observacao);
		} catch (DBException exception) {
			throw new DatabaseRequestException(exception);
		}
		Map<String, String> body = new HashMap<>();
		body.put("key", observacao.getKey());
		body.put("date", date.toString());
		
		Boolean logResult = addLog(args, date);
		body.put("logResult", logResult.toString());
		
		Boolean addKeyResult = addKey(args, observacao);
		body.put("addKeyResult", addKeyResult.toString());
		
		return body;

	}


	private boolean addKey(Map<String, String> args, Observacao observacao) throws APIException {
		try {
			if (args.containsKey("pavimento")) {
				
				Map<String, String> argsPavimento= new HashMap<>();
				argsPavimento.put("codigo", args.get("pavimento"));
				
				PavimentoEndpoint pavimentoEndpoint = new PavimentoEndpoint();
				
				Pavimento pavimento = pavimentoEndpoint.get(argsPavimento);
				pavimento.addObservacao(observacao.getKey());
				pavimentoEndpoint.put(argsPavimento, pavimento);
				return true;
			}
			
			else if (args.containsKey("setor")) {
				Map<String, String> argsSetor= new HashMap<>();
				argsSetor.put("codigo", args.get("setor"));
				
				SetorEndpoint setorEndpoint = new SetorEndpoint();
				
				Setor setor= setorEndpoint.get(argsSetor);
				setor.addObservacao(observacao.getKey());
				setorEndpoint.put(argsSetor, setor);
				return true;
			}
			
			else {
				return false;
			}			
		} catch (Exception e) {
			return false;
		}
		
	}


	private boolean addLog(Map<String, String> args, Date date) throws APIException {
		try {
			Map<String, String> argsObra= new HashMap<>();
			argsObra.put("codigo", args.get("obra"));
			ObraEndpoint obraEndpoint = new ObraEndpoint();
			Obra obra = obraEndpoint.get(argsObra);
			String titulo = "";
			
			if (args.containsKey("pavimento")) {				
				Map<String, String> argsPavimento= new HashMap<>();
				argsPavimento.put("codigo", args.get("pavimento"));				
				PavimentoEndpoint pavimentoEndpoint = new PavimentoEndpoint();
				Pavimento pavimento = pavimentoEndpoint.get(argsPavimento);
				titulo = pavimento.getTitulo();
			}
			
			else if (args.containsKey("setor")) {
				Map<String, String> argsSetor= new HashMap<>();
				argsSetor.put("codigo", args.get("setor"));
				SetorEndpoint setorEndpoint = new SetorEndpoint();
				Setor setor= setorEndpoint.get(argsSetor);
				titulo = setor.getTitulo();
			}
			

			String log = new SimpleDateFormat("dd/MM/yyyy - HH:mm").format(date) 
					+ " - Uma observação foi adicionada ao "
					+ titulo;
			
			obra.addLog(log);
			obraEndpoint.put(argsObra, obra);
			
			return true;
		} catch (Exception e){
			return false;
		}
	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Observacao observacao) throws APIException {
		ObservacaoDAO dao = new ObservacaoDAO();
		Date date;
	    try {
	        date = dao.update(observacao);
	    } catch (DBException exception) {
	    	throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    body.put("key",  observacao.getKey());
	    
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
		ObservacaoDAO dao = new ObservacaoDAO();
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
