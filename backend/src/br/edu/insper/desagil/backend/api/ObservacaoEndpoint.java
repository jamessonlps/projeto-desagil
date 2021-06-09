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
		
		Boolean logResult = addLog(args, date, observacao.isAlerta());
		body.put("logResult", logResult.toString());
		
		Boolean addKeyResult = addKey(args, observacao);
		body.put("addKeyResult", addKeyResult.toString());
		
		return body;

	}


	private boolean addKey(Map<String, String> args, Observacao observacao) throws APIException {
		Boolean result = false;
		
		try {			
			Map<String, String> argsObra = new HashMap<>();
			String keyObra = null;
			
			if (args.containsKey("pavimento")) {
				
				Map<String, String> argsPavimento= new HashMap<>();
				argsPavimento.put("key", args.get("pavimento"));
				
				PavimentoEndpoint pavimentoEndpoint = new PavimentoEndpoint();
				Pavimento pavimento = pavimentoEndpoint.get(argsPavimento);
				
				pavimento.addObservacao(observacao.getKey());
				pavimentoEndpoint.put(argsPavimento, pavimento);
				
				keyObra = pavimento.getObra();
				result = true;
			}
			
			else if (args.containsKey("setor")) {
				Map<String, String> argsSetor= new HashMap<>();
				argsSetor.put("key", args.get("setor"));
				
				SetorEndpoint setorEndpoint = new SetorEndpoint();
				Setor setor= setorEndpoint.get(argsSetor);
				
				setor.addObservacao(observacao.getKey());
				setorEndpoint.put(argsSetor, setor);
				
				keyObra = setor.getObra();
				result = true;
			}
			
			if (observacao.isAlerta()) {
				argsObra.put("key", keyObra);
				ObraEndpoint obraEndpoint = new ObraEndpoint();
				Obra obra = obraEndpoint.get(argsObra);
				obra.addAlerta(observacao.getKey());
				obraEndpoint.put(argsObra, obra);
				result = true;
			}
		} catch (Exception e) {
			result = false;
		}
		
		return result;
	}


	private boolean addLog(Map<String, String> args, Date date, Boolean alerta) throws APIException {
		try {
			Map<String, String> argsObra= new HashMap<>();
			String titulo = "";
			
			if (args.containsKey("pavimento")) {				
				Map<String, String> argsPavimento= new HashMap<>();
				argsPavimento.put("key", args.get("pavimento"));				
				
				PavimentoEndpoint pavimentoEndpoint = new PavimentoEndpoint();
				Pavimento pavimento = pavimentoEndpoint.get(argsPavimento);

				argsObra.put("key", pavimento.getObra());
				titulo = pavimento.getTitulo();
			}
			
			else if (args.containsKey("setor")) {
				Map<String, String> argsSetor= new HashMap<>();
				argsSetor.put("key", args.get("setor"));
				
				SetorEndpoint setorEndpoint = new SetorEndpoint();
				Setor setor= setorEndpoint.get(argsSetor);
				
				argsObra.put("key",  setor.getObra());
				titulo = setor.getTitulo();
			}
			
			ObraEndpoint obraEndpoint = new ObraEndpoint();
			Obra obra = obraEndpoint.get(argsObra);
			String log;

			if (alerta) {
				log = new SimpleDateFormat("dd/MM/yyyy - HH:mm").format(date) 
						+ " - Um alerta foi adicionado ao "
						+ titulo;
			}
			
			else {
				log = new SimpleDateFormat("dd/MM/yyyy - HH:mm").format(date) 
						+ " - Uma observação foi adicionada ao "
						+ titulo;
			}
			
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
