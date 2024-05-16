package org.ofertare.LoginSignUp;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.*;
import org.ofertare.Credentials.UserCredentials;
import org.ofertare.UserEntity;

@Path("/login")
public class Login {
    @Inject
    EntityManager entityManager;

    @POST
    @Path("/ceckCredentials")
    @Transactional
    public Response login(UserCredentials credentiale) {

        UserEntity user = entityManager.createQuery("SELECT u FROM UserEntity u WHERE u.username = :username", UserEntity.class)
                .setParameter("username", credentiale.getUsername())
                .getSingleResult();

        if (user != null && user.getPassword().equals(credentiale.getPassword())) {
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Autentificare eșuată").build();
        }
    }

}
