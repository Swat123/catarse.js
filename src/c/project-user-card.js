window.c.ProjectUserCard = ((m,c, _, h) => {
    return {
        controller: (args) => {
            let displayModal = h.toggleProp(false, true);

            return {displayModal: displayModal};
        },

        view: (ctrl, args) => {
            const contactModalC = ['OwnerMessageContent', args.userDetails];
            return m('#user-card', _.map(args.userDetails(), (userDetail) => {
                return m('.u-marginbottom-30.u-text-center-small-only', [
                    (ctrl.displayModal() ? m.component(c.ModalBox, {
                        displayModal: ctrl.displayModal,
                        content: contactModalC
                    }) : ''),
                    m('.w-row', [
                        m('.w-col.w-col-4', [
                            m('img.thumb.u-marginbottom-30.u-round[width="100"][itemprop="image"][src="' + userDetail.profile_img_thumbnail + '"]')
                        ]),
                        m('.w-col.w-col-8', [
                            m('.fontsize-small.link-hidden.fontweight-semibold.u-marginbottom-10.lineheight-tight[itemprop="name"]', [
                                m('a.link-hidden[href="/users/' + userDetail.id + '"]', userDetail.name)
                            ]),
                            m('.fontsize-smallest', [
                                h.pluralize(userDetail.total_published_projects, ' criado', ' criados'),
                                m.trust('&nbsp;&nbsp;|&nbsp;&nbsp;'),
                                h.pluralize(userDetail.total_contributed_projects, ' apoiado', ' apoiados')
                            ]),
                            m('ul.w-hidden-tiny.w-hidden-small.w-list-unstyled.fontsize-smaller.fontweight-semibold.u-margintop-20.u-marginbottom-20', [
                                (!_.isEmpty(userDetail.facebook_link) ? m('li', [
                                    m('a.link-hidden[itemprop="url"][href="' + userDetail.facebook_link + '"][target="_blank"]', 'Perfil no Facebook')
                                ]) : ''), (!_.isEmpty(userDetail.twitter_username) ? m('li', [
                                    m('a.link-hidden[itemprop="url"][href="https://twitter.com/' + userDetail.twitter_username + '"][target="_blank"]', 'Perfil no Twitter')
                                ]) : ''),
                                _.map(userDetail.links, (link) => {
                                    var parsedLink = h.parseUrl(link);

                                    return (!_.isEmpty(parsedLink.hostname) ? m('li', [
                                        m('a.link-hidden[itemprop="url"][href="' + link + '"][target="_blank"]', parsedLink.hostname)
                                    ]) : '');
                                })
                            ]), (!_.isEmpty(userDetail.email) ? [m('a.w-button.btn.btn-terciary.btn-small.btn-inline[href=\'javascript:void(0);\']',{onclick: ctrl.displayModal.toggle}, 'Enviar mensagem')] : '')
                        ]),
                    ]),
                ]);
            }));
        }
    };
}(window.m, window.c, window._, window.c.h));
