package com.ecommerce.repository;

import java.util.Optional;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.RoleName;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(RoleName roleName);

}