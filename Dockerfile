FROM quay.io/keycloak/keycloak:latest AS builder

WORKDIR /opt/keycloak

# Copy the JAR file for Keycloak versions other than 22-25 (for v26+)
# Since we're using Keycloak version > 26, we use the all-other-versions JAR
COPY dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/keycloak/providers/

# Build Keycloak with the custom theme
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Set the entrypoint - all configuration will come from docker-compose
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start"]