package fr.real.english.routes.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import fr.real.english.routes.models.Route;

public interface RouteRepository extends CrudRepository<Route, Long>{
	public List<Route> findByUrl(String url);
}
