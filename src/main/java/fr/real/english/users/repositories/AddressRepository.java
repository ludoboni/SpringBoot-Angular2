package fr.real.english.users.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import fr.real.english.users.models.Address;

public interface AddressRepository extends CrudRepository<Address, Long> {
	public List<Address> findByPostcode(String postcode);
}
