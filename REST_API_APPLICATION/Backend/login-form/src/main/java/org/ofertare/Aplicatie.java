package org.ofertare;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/users")
public class Aplicatie {
    @PersistenceContext
    EntityManager entityManager;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        List usernames = entityManager
                .createNativeQuery("SELECT username FROM user")
                .getResultList();

        return Response.ok(usernames).build();
    }

    @GET
    @Path("{user}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIdByUsername(@PathParam("user") String username_dat){
        List id = entityManager
                .createNativeQuery("SELECT id_user From user Where username = :username")
                .setParameter("username",username_dat)
                .getResultList();
        return Response.ok(id).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") int id){
        return UserEntity.findByIdOptional(id)
                    .map(user -> Response.ok(user).build())
                    .orElse(Response.status(Response.Status.NOT_FOUND).build());

    }


}
