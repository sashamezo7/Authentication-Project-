package org.ofertare.LoginSignUp;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.*;
import org.ofertare.Credentials.UserCredentials;
import org.ofertare.UserEntity;
import org.ofertare.email.EmailSender;

import java.util.Objects;

@Path("/signup")
public class SignUp extends EmailSender{
    @Inject
    EntityManager entityManager;
    @Inject
    EmailSender emailSender;

    @POST
    @Path("/save")
    @Transactional
    public Response signUp(UserCredentials credentiale) {
        try{

            UserEntity userNou = new UserEntity();
            userNou.setUsername(credentiale.getUsername());
            userNou.setPassword(credentiale.getPassword());
            userNou.setEmail(credentiale.getEmail());
            entityManager.persist(userNou);
            return Response.ok().build();

        }catch(Exception exception){
            return Response.status(Response.Status.BAD_REQUEST).entity("Server problems").build();
        }

    }

    @POST
    @Path("/signUpCredentials")
    @Transactional
    public Response ceckCredentials(UserCredentials credentiale) {

        UserEntity existingUser = entityManager.createQuery("SELECT u FROM UserEntity u WHERE u.username = :username OR u.password = :password OR u.email = :email", UserEntity.class)
                .setParameter("username", credentiale.getUsername())
                .setParameter("password", credentiale.getPassword())
                .setParameter("email", credentiale.getEmail())
                .getResultStream()
                .findFirst()
                .orElse(null);
        if (existingUser != null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Username or password already exists").build();
        } else {
            return Response.ok().build();
        }
    }

    @POST
    @Path("/ceckCode")
    @Transactional
    public Response signUp(String cod) {
        System.out.println(cod);
        System.out.println(emailSender.toString());
        if (Objects.equals(cod, emailSender.toString())) {
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Incorrect code").build();
        }
    }
}
