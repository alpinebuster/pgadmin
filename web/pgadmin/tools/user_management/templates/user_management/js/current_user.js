define('pgadmin.user_management.current_user', [], function() {
    return {
        'id': {{ user_id }},
        'email': '{{ email }}',
        'is_admin': {{ is_admin }},
        'name': '{{ name }}',
        'allow_save_password': {{ allow_save_password }},
        'allow_save_tunnel_password': {{ allow_save_tunnel_password }},
        'auth_sources': {{ auth_sources }},
        'current_auth_source': '{{ current_auth_source }}'
    }
});
