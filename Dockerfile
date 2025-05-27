FROM quay.io/keycloak/keycloak:latest AS builder

WORKDIR /opt/keycloak

# Copy your custom theme JAR to the providers directory
# Assuming your theme JAR is in the same directory as this Dockerfile
COPY sarafrika-theme.jar /opt/keycloak/providers/

# Build Keycloak with the custom theme
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Set the entrypoint - all configuration will come from docker-compose
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start"]