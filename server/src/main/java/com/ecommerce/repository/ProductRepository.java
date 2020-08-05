package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    public List<Product> findByDepartment(String department);

    @Query(value = "SELECT * FROM Product p WHERE p.product_name LIKE %:name%", nativeQuery = true)
    public List<Product> findByName(@Param("name") String name);

}
