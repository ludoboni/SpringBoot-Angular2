package fr.real.english.users.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import fr.real.english.users.models.Account;

public interface AccountRepository extends CrudRepository<Account, Long> {
	public List<Account> findByLastName(String lastName);

	public Account findByUsername(String username);

	public Account findByEmail(String email);
}
