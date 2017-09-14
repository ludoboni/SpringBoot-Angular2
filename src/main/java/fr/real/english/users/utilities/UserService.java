package fr.real.english.users.utilities;

import javax.servlet.http.HttpServletRequest;

import fr.real.english.configuration.AuthenticatedUsersService;

public class UserService {

	public static String getUser(HttpServletRequest request) {
		String name = AuthenticatedUsersService.getUser(request.getSession(false).getId());
		return name;
	}
}
