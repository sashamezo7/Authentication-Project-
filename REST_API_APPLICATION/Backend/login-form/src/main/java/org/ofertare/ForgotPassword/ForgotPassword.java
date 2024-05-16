package org.ofertare.ForgotPassword;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.*;
import org.ofertare.UserEntity;
import org.ofertare.Credentials.UserCredentials;

import org.ofertare.email.EmailSender;

@Path("/forgotpassword")
public class ForgotPassword {

    private String token;
    @Inject
    EntityManager entityManager;
    @Inject
    EmailSender emailSender;

    @PUT
    @Transactional
    @Path("/savenewpassword")
    public Response saveNewPassword(UserCredentials userCredentials){
        System.out.println(userCredentials.getEmail());
        System.out.println(userCredentials.getPassword());

        UserEntity user = entityManager.createQuery("SELECT u FROM UserEntity u WHERE u.email=:email", UserEntity.class)
                .setParameter("email", userCredentials.getEmail())
                .getResultStream()
                .findFirst()
                .orElse(null);
        if(user!=null){
            user.setPassword(userCredentials.getPassword());
            return Response.ok().build();
        }
        else {
            return Response.status(Response.Status.BAD_REQUEST).entity("user nu exista").build();
        }

    }

    @POST
    @Transactional
    @Path("/verify_email")
    public Response verifyEmail(UserCredentials userCredentials){

        UserEntity user = entityManager.createQuery("SELECT u FROM UserEntity u WHERE u.email=:email", UserEntity.class)
                .setParameter("email", userCredentials.getEmail())
                .getResultStream()
                .findFirst()
                .orElse(null);
        if(user!=null){
            return Response.ok().build();
        }
        else {
            return Response.status(Response.Status.BAD_REQUEST).entity("email nu exista").build();
        }

    }

    @POST
    @Path("/reset-password")
    @Transactional
    public Response resetPasswordRequest(UserCredentials userCredentials) {
        UserEntity user = entityManager.createQuery("SELECT u FROM UserEntity u WHERE u.email=:email", UserEntity.class)
                .setParameter("email", userCredentials.getEmail())
                .getResultStream()
                .findFirst()
                .orElse(null);

        if (user == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Email not found").build();
        }

         token = emailSender.generateRandomString(20);


        String resetUrl = "http://localhost:3000/reset-password?token=" + token;


        emailSender.sendResetEmail(userCredentials.getEmail(), resetUrl);

        return Response.ok().build();
    }

    @GET
    @Path("/get-token")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getToken() {
        if (token == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Token not generated").build();
        }
        return Response.ok().entity("{\"token\": \"" + token + "\"}").build();
    }



}
