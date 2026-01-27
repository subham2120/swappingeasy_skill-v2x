package com.swapingeasy.controller;
import com.swapingeasy.dto.ConversationResponse;
import com.swapingeasy.dto.MessageRequest;
import com.swapingeasy.entity.Conversation;
import com.swapingeasy.entity.Message;
import com.swapingeasy.entity.User;
import com.swapingeasy.repository.ConversationRepository;
import com.swapingeasy.repository.UserRepository;
import com.swapingeasy.service.ConversationService;
import com.swapingeasy.service.MessageService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final ConversationService conversationService;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;



    public MessageController(MessageService messageService,
                             ConversationService conversationService,
                             ConversationRepository conversationRepository,
                             UserRepository userRepository) {
        this.messageService = messageService;
        this.conversationService = conversationService;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }


    @GetMapping("/my-conversations/{userId}")
    public List<ConversationResponse> myConversations(@PathVariable Long userId) {

        return conversationRepository.findByUser(userId)
                .stream()
                .map(c -> {
                    ConversationResponse res = new ConversationResponse();
                    res.setConversationId(c.getId());

                    Long otherUserId =
                            c.getUser1Id().equals(userId)
                                    ? c.getUser2Id()
                                    : c.getUser1Id();

                    User otherUser = userRepository.findById(otherUserId)
                            .orElseThrow();

                    res.setOtherUserId(otherUserId);
                    res.setOtherUserName(otherUser.getName());
                    res.setLastMessage(c.getLastMessage());

                    return res;
                })
                .toList();
    }



    @PostMapping("/send")
    public void sendMessage(@RequestBody MessageRequest request) {
        messageService.sendMessage(request);
    }

    @PostMapping("/init")
    public Map<String, Long> initConversation(@RequestBody MessageRequest req) {
        Conversation conversation =
                conversationService.getOrCreate(
                        req.getSenderId(),
                        req.getReceiverId()
                );
        return Map.of("conversationId", conversation.getId());
    }

    @GetMapping("/conversation/{conversationId}")
    public List<Message> getMessages(
            @PathVariable Long conversationId
    ) {
        return messageService.getMessages(conversationId);
    }

}




