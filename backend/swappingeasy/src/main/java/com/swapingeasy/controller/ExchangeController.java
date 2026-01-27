package com.swapingeasy.controller;

import com.swapingeasy.dto.ExchangeResponse;
import com.swapingeasy.entity.Exchange;
import com.swapingeasy.service.ExchangeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exchange")
@CrossOrigin(origins = "http://localhost:3000")
public class ExchangeController {

    private final ExchangeService exchangeService;

    public ExchangeController(ExchangeService exchangeService) {
        this.exchangeService = exchangeService;
    }

    // ✅ SEND REQUEST
    @PostMapping("/request")
    public Exchange create(@RequestBody Exchange exchange) {
        return exchangeService.createExchange(exchange);
    }

    // ✅ SENT REQUESTS
    @GetMapping("/requester/{requesterId}")
    public List<ExchangeResponse> byRequester(@PathVariable Long requesterId) {
        return exchangeService.getByRequester(requesterId);
    }

    // ✅ RECEIVED REQUESTS
    @GetMapping("/owner/{ownerId}")
    public List<ExchangeResponse> byOwner(@PathVariable Long ownerId) {
        return exchangeService.getByOwner(ownerId);
    }

    // ✅ ACCEPT
    @PutMapping("/accept/{id}")
    public void accept(@PathVariable Long id) {
        exchangeService.acceptExchange(id);
    }

    // ✅ REJECT
    @PutMapping("/reject/{id}")
    public void reject(@PathVariable Long id) {
        exchangeService.rejectExchange(id);
    }

    // ✅ DELETE
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        exchangeService.deleteExchange(id);
    }
}
