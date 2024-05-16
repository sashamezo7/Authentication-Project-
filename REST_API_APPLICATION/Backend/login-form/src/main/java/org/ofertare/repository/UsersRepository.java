package org.ofertare.repository;

import com.speedment.jpastreamer.application.JPAStreamer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class UsersRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    public List<String> getAllUsernames() {
        return entityManager.createQuery("SELECT u.username FROM UserEntity u", String.class)
                .getResultList();
    }


}
