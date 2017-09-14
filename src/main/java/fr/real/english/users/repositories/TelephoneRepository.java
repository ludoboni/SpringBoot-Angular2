package fr.real.english.users.repositories;

import org.springframework.data.repository.CrudRepository;

import fr.real.english.users.models.Telephone;

public interface TelephoneRepository extends CrudRepository<Telephone, Long> {

}
