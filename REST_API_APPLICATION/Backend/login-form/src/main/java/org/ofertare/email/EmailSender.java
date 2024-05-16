package org.ofertare.email;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.smallrye.common.annotation.Blocking;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import lombok.Getter;
import lombok.Setter;

import java.util.Random;

@Path("/mail")
@ApplicationScoped
public class EmailSender {

    @Getter
    @Setter
    private  String code;
    @Inject
    Mailer mailer;


    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%*@?><{}[]-!#$%";

    public static String generateRandomString(int length) {
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }

        return stringBuilder.toString();
    }
    public void sendResetEmail(String email, String resetUrl) {
        mailer.send(Mail.withHtml(email, "Password Reset", "<p>Click <a href=\"" + resetUrl + "\">here</a> to reset your password</p>"));
    }

    @Override
    public String toString() {
        return "\"" + code + "\"";
    }

    @POST
    @Blocking
    public void sendASimpleEmail(String email) {
        code = generateRandomString(10);
        mailer.send(Mail.withText(email, "Authentification Code", code));
    }


}
